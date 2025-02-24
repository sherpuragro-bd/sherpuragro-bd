"use client";

import { Input } from "@/app/components/ui/Input";
import { useEffect, useState } from "react";
import DistrictAndUpazila from "./DistrictAndUpazila";
import { districtsData } from "@/public/data/District";
import { upazilasData } from "@/public/data/Upazila";
import { useForm } from "react-hook-form";
import LineErro from "@/app/components/ui/LineErro";
import { newAddress, revalidateAddresses } from "@/actions/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AddressNewLoading from "../(pages)/addresses/new/loading";
import Banner from "./Banner";

export default function AddressNew() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [windowsLoaded, setwindowsLoaded] = useState(false);
  const [number, setNumber] = useState();
  const [selectedDistrict, setselectedDistrict] = useState();
  const [filteredUpazilas, setfilteredUpazilas] = useState();
  const [selectedUpazila, setselectedUpazila] = useState();
  const [districtError, setdistrictError] = useState();
  const [upazilaError, setupazilaError] = useState();
  const [isCreating, setisCreating] = useState(false);
  const router = useRouter();

  const handleNumber = (e) => {
    const newValue = e.target.value;
    if (/^\d{0,11}$/.test(newValue)) {
      setNumber(newValue);
    }
  };

  const districtOptions = districtsData.map((district) => ({
    value: {
      name: district.name,
      id: district.id,
    },
    label: district.bn_name,
  }));

  useEffect(() => {
    setwindowsLoaded(true);
    if (selectedDistrict?.value) {
      setselectedUpazila(null);
      const upazilasFiltered = upazilasData
        .filter((up) => up.district_id === selectedDistrict.value.id)
        .map((upazila) => ({
          value: {
            name: upazila.name,
            id: upazila.id,
          },
          label: upazila.bn_name,
        }));
      setfilteredUpazilas(upazilasFiltered);
    } else {
      setfilteredUpazilas([]);
    }
  }, [selectedDistrict]);

  const handelNewAddress = async (data) => {
    if (isCreating) {
      return;
    }
    if (!selectedDistrict) {
      setdistrictError("আপনার জেলা নির্বাচন করুন");
      return;
    } else {
      setdistrictError(undefined);
    }
    if (!selectedUpazila) {
      setupazilaError("আপনার উপজেলা নির্বাচন করুন");
      return;
    } else {
      setupazilaError(undefined);
    }

    const addressData = {
      name: data.name,
      email: data.email,
      phone: data.number,
      address: data.address,
      district: selectedDistrict.value.name,
      upazila: selectedUpazila.value.name,
    };
    setisCreating(true);
    const res = await newAddress(addressData);
    reset();
    if (!res.success) {
      toast.error(res.error);
      return;
    }
    await revalidateAddresses();
    router.push("/account/addresses");
    router.refresh();
    toast.success(res.msg);
  };

  if (!windowsLoaded) {
    return <AddressNewLoading />;
  }

  return (
    <>
      <Banner />
      <form
        onSubmit={handleSubmit(handelNewAddress)}
        className="p-10 space-y-5 pb-14 mt-5 rounded-xl border"
      >
        <div className="flex flex-wrap sm:flex-nowrap w-full gap-5">
          <div className="w-full">
            <Input
              required
              maxLength="70"
              className="!pl-5"
              label="নাম"
              childrenClass={`!m-0`}
              placeholder="আপনার পুরো নাম"
              {...register("name", { required: true })}
            />
            {errors.name && <LineErro>নামে লিখুন</LineErro>}
          </div>
          <div className="w-full">
            <Input
              type="email"
              required
              maxLength="70"
              className="!pl-5"
              label="ইমেইল"
              childrenClass={`!m-0`}
              placeholder="ইমেইল"
              {...register("email", { required: true })}
            />
            {errors.name && <LineErro>আপনার ইমেইল লিখুন</LineErro>}
          </div>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap w-full gap-5">
          <div className="w-full">
            <Input
              {...register("number", { required: true })}
              required
              onChange={handleNumber}
              icon={
                <svg
                  width={23}
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#006A4D"
                    d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"
                  />
                  <circle fill="#F42A41" cx={16} cy="17.5" r={7} />
                </svg>
              }
              value={number || ""}
              type="number"
              childrenClass="!mt-2"
              label="ফোন নাম্বার"
              placeholder="আপনার ফোন নাম্বার"
            >
              {errors.number && <LineErro>ফোন নাম্বার লিখুন</LineErro>}
            </Input>
          </div>
          <div className="w-full">
            <Input
              required
              maxLength="70"
              className="!pl-5"
              label="ঠিকানা"
              type="address"
              childrenClass={`!m-0`}
              placeholder="আপনার ঠিকানা"
              {...register("address", { required: true })}
            />
            {errors.address && <LineErro>আপনার ঠিকানা</LineErro>}
          </div>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap w-full gap-5">
          <div className="w-full">
            <label>
              জেলা <span className="text-orange-600 text-sm">*</span>
            </label>
            <DistrictAndUpazila
              setAddress={setselectedDistrict}
              value={selectedDistrict}
              options={districtOptions}
              placeholder=" জেলা নির্বাচন করুন"
            />
            {districtError && (
              <LineErro className="mt-1 !font-normal">{districtError}</LineErro>
            )}
          </div>
          <div className="w-full">
            <label>
              উপজেলা <span className="text-orange-600 text-sm">*</span>
            </label>
            <DistrictAndUpazila
              setAddress={setselectedUpazila}
              value={selectedUpazila}
              options={filteredUpazilas}
              placeholder={
                filteredUpazilas
                  ? `উপজেলা নির্বাচন করুন`
                  : "জেলা নির্বাচন করুন প্রথমে"
              }
            />
            {upazilaError && (
              <LineErro className="mt-1 !font-normal">{upazilaError}</LineErro>
            )}
          </div>
        </div>
        <button
          disabled={isCreating}
          className={`w-full sm:w-fit hover:scale-95 transition-all rounded-md bg-gradient-to-br from-primary to-primary/60 border font-light text-white px-5 py-2 border-primary translate-y-5 ${
            isCreating && "cursor-not-allowed opacity-50"
          }`}
        >
          ঠিকানা যুক্ত করুন
        </button>
      </form>
    </>
  );
}
