import MinimalCard, {
  MinimalCardContent,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card";

export default function PriceCharts() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Intraday Chart */}
      <MinimalCard className="flex-1 h-80">
        <MinimalCardContent>
          <MinimalCardTitle>Intraday Chart</MinimalCardTitle>
          <MinimalCardDescription>
            Display 5min/15min interval price chart here
          </MinimalCardDescription>
        </MinimalCardContent>
      </MinimalCard>

      {/* Historical Chart */}
      <MinimalCard className="flex-1 h-80">
        <MinimalCardContent>
          <MinimalCardTitle>Historical Chart</MinimalCardTitle>
          <MinimalCardDescription>
            Display daily OHLCV chart (6M/1Y)
          </MinimalCardDescription>
        </MinimalCardContent>
      </MinimalCard>
    </div>
  );
}
