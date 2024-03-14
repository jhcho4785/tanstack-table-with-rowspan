'use client';

import {useMemo} from 'react';
import {createColumnHelper} from '@tanstack/table-core';
import Table from "@/app/components/Table";

interface Sample {
  hospitalName: string;
  TotalPost: {
    successCnt: number;
    failCnt: number;
    successAmount: number;
  };
  NhisPost: {
    successCnt: number;
    failCnt: number;
    successAmount: number;
  };
}

export default function Home() {
  const data: Sample[] = [
    { hospitalName: '아름누리병원', TotalPost: { successCnt: 1, failCnt: 0, successAmount: 100 }, NhisPost: { successCnt: 1, failCnt: 0, successAmount: 100 } },
    { hospitalName: '아름누리병원2', TotalPost: { successCnt: 1, failCnt: 0, successAmount: 100 }, NhisPost: { successCnt: 1, failCnt: 0, successAmount: 100 } },
  ];
  const columnHelper = createColumnHelper<Sample>();
  const columns = useMemo(
      () => [
        columnHelper.accessor('hospitalName', { header: '검진기관' }),
        columnHelper.group({
          header: 'AM-PASS',
          columns: [
            columnHelper.group({
              header: '종합검진',
              columns: [
                columnHelper.accessor('TotalPost.successCnt', { header: '성공건수' }),
                columnHelper.accessor('TotalPost.failCnt', { header: '실패건수' }),
                columnHelper.accessor('TotalPost.successAmount', { header: '요금' }),
              ],
            }),
            columnHelper.group({
              header: '공단검진',
              columns: [
                columnHelper.accessor('NhisPost.successCnt', { header: '성공건수' }),
                columnHelper.accessor('NhisPost.failCnt', { header: '실패건수' }),
                columnHelper.accessor('NhisPost.successAmount', { header: '요금' }),
              ],
            }),
          ],
        }),
      ],
      [columnHelper],
  );

  return <Table data={data ?? []} columns={columns} />;
}
