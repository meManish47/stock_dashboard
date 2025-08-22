import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export type CompanyWithQuote = {
  c: number | undefined;
  d: number | undefined;
  dp: number | undefined;
  h: number | undefined;
  l: number | undefined;
  o: number | undefined;
  pc: number | undefined;
  t: number | undefined;
  companyName: string | undefined;
  symbol: string | undefined;
};
export default function CompanyTable({
  companyWithQuote,
}: {
  companyWithQuote: CompanyWithQuote | undefined;
}) {
  // console.log("akjsdhfjkaskjfhs", companyWithQuote);
  if (!companyWithQuote)
    return (
      <div className="w-full h-max p-5 flex items-centers">
        <p className="text-muted-foreground text-lg">
          Cant show at the moment:/
        </p>
      </div>
    );
  return (
    <main>
      <Table>
        <TableCaption>
          {companyWithQuote.companyName} ({companyWithQuote.symbol})
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Price (c)</TableHead>
            <TableHead>Change (d)</TableHead>
            <TableHead>Change % (dp)</TableHead>
            <TableHead>High (h)</TableHead>
            <TableHead>Low (l)</TableHead>
            <TableHead>Open (o)</TableHead>
            <TableHead>Prev Close (pc)</TableHead>
            <TableHead>Time (t)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>${companyWithQuote.c?.toFixed(2)}</TableCell>
            <TableCell>{companyWithQuote.d}</TableCell>
            <TableCell
              className={
                companyWithQuote.dp && companyWithQuote.dp >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {companyWithQuote.dp?.toFixed(2)}%
            </TableCell>
            <TableCell>${companyWithQuote.h?.toFixed(2)}</TableCell>
            <TableCell>${companyWithQuote.l?.toFixed(2)}</TableCell>
            <TableCell>${companyWithQuote.o?.toFixed(2)}</TableCell>
            <TableCell>${companyWithQuote.pc?.toFixed(2)}</TableCell>
            <TableCell>
              {companyWithQuote.t
                ? new Date(companyWithQuote.t * 1000).toLocaleString()
                : "-"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
