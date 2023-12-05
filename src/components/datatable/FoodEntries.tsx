import {useEffect, useState} from "react";
import {getFoodEntries} from "@/api/overview/overview.redaxios.ts";
import {FoodEntryDTO} from "@/model/FoodEntryDTO.ts";
import {
    ColumnDef,
    ColumnFiltersState, flexRender, getCoreRowModel, getPaginationRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";

type FoodEntry = {
    mealName: string
    foodName: string
    foodGroup: string
}

const mapFoodEntryDTOToFoodEntry = (entry: FoodEntryDTO): FoodEntry[] => {
    return entry.foods.map((food) => ({
        mealName: entry.mealName,
        foodName: food.foodName,
        foodGroup: food.foodGroup,
    }));
};

const FoodEntries = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [tableData, setTableData] = useState<FoodEntry[]>([]);
    const [pageSize, setPageSize] = useState(0);


    const columns: ColumnDef<FoodEntry>[] = [
        {
            accessorKey: "mealName",
            header: "Meal Name",
        },
        {
            accessorKey: "foodName",
            header: "Food Name",
        },
        {
            accessorKey: "foodGroup",
            header: "Food Group",
        },
    ];

    const table = useReactTable({
        data: tableData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: {
                pageIndex: pageSize,
                pageSize: 5
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });


    useEffect(() => {
        let mounted = true;

        getFoodEntries().then(data => {
            if (mounted) {
                const mappedData = data.flatMap(mapFoodEntryDTOToFoodEntry);
                setTableData(mappedData);
            }
        });

        return () => {
            mounted = false;
        }
    }, []);

    const handleNext = () => {
        setPageSize((prevPageSize) => prevPageSize + 1)
    }

    const handlePrevious = () => {
        if (pageSize > 0) {
            setPageSize((prevPageSize) => prevPageSize - 1)
        }
    }

    return (
        <div>
            <div className="text-lg my-2">Food Entries</div>
            <div className="w-[650px]">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrevious}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNext}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );

}

export default FoodEntries;