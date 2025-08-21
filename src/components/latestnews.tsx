import MinimalCard, {
  MinimalCardContent,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card";
export default function LatestNews() {
  return (
    <MinimalCard className="w-full max-w-4xl mx-auto">
      <MinimalCardContent>
        <MinimalCardTitle>Latest Company News</MinimalCardTitle>
        <MinimalCardDescription>
          - Headline 1 (with link)
          <br />
          - Headline 2
          <br />- Headline 3
        </MinimalCardDescription>
      </MinimalCardContent>
    </MinimalCard>
  );
}
