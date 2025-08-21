import MinimalCard, {
  MinimalCardContent,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card";

export default function TechnicalIndicators() {
  return (
    <MinimalCard className="w-full max-w-4xl mx-auto">
      <MinimalCardContent>
        <MinimalCardTitle>Technical Indicators</MinimalCardTitle>
        <MinimalCardDescription>
          RSI, MACD, SMA(50), SMA(200), Volume trends
        </MinimalCardDescription>
      </MinimalCardContent>
    </MinimalCard>
  );
}
