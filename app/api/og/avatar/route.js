import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const avatar = searchParams.get("avatar") || "A";

  const avatarStyles = [
    { background: "#FF5733", color: "#FFFFFF" }, // Orange - White text
    { background: "#33A1FF", color: "#FFFFFF" }, // Blue - White text
    { background: "#2ECC71", color: "#FFFFFF" }, // Green - White text
    { background: "#F1C40F", color: "#000000" }, // Yellow - Black text
    { background: "#9B59B6", color: "#FFFFFF" }, // Purple - White text
    { background: "#34495E", color: "#FFFFFF" }, // Dark Blue - White text
    { background: "#E74C3C", color: "#FFFFFF" }, // Red - White text
    { background: "#1ABC9C", color: "#FFFFFF" }, // Teal - White text
    { background: "#E67E22", color: "#FFFFFF" }, // Dark Orange - White text
    { background: "#BDC3C7", color: "#000000" }, // Light Gray - Black text
    { background: "#95A5A6", color: "#000000" }, // Muted Gray - Black text
    { background: "#D35400", color: "#FFFFFF" }, // Burnt Orange - White text
    { background: "#7F8C8D", color: "#FFFFFF" }, // Grayish Blue - White text
  ];

  function spinForLogo() {
    const randomIndex = Math.floor(Math.random() * avatarStyles.length);
    return avatarStyles[randomIndex];
  }

  const selectedLogo = spinForLogo();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100px",
          height: "100px",
          backgroundColor: selectedLogo.background,
          color: selectedLogo.color,
          fontSize: "50px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {avatar.slice(0, 1).toLocaleUpperCase()}
      </div>
    ),
    {
      width: 100,
      height: 100,
    }
  );
}
