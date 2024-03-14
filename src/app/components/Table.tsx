import {ColumnDef, flexRender, useReactTable} from "@tanstack/react-table";
import {getCoreRowModel} from "@tanstack/table-core";

interface Props {
  data: any[];
  columns: ColumnDef<any, any>[];
}

const Table = ({data, columns}: Props) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    enableRowSelection: true,
  });

  const headerColumnIds: string[] = [];

  //중복 문자열 갯수 찾기
  const getHeaderRowSpan = (str: string, pattern: string) => {
    const regex = new RegExp(pattern, 'gi');
    const matches = str.match(regex);
    return matches ? matches.length : 0;
  };

  return (
      <table>
        <thead>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  //group이 아닌 header는 id값에 depth만큼 column id가 중복되어 들어감 -> 중복 갯수를 찾아 병합 처리
                  const rowSpan = getHeaderRowSpan(header.id, header.column.id);
                  if (!headerColumnIds.includes(header.column.id)) {
                    headerColumnIds.push(header.column.id);
                    return (
                        <th key={header.id} colSpan={header.colSpan} rowSpan={rowSpan}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                    );
                  }
                  return null;
                })}
              </tr>
          );
        })}
        </thead>
        <tbody>
        {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
              ))}
            </tr>
        ))}
        </tbody>
      </table>
  );
}

export default Table;