defmodule Main do
    def make_line(line, diagonal) do
        [{x1, y1},{x2, y2}] = line
        dx = cond do 
          x1 > x2 -> -1
          x1 < x2 -> 1
          true -> 0
        end

        dy = cond do 
          y1 > y2 -> -1
          y1 < y2 -> 1
          true -> 0
        end

        cond do 
            x1 === x2 -> Enum.map(y1..y2//dy, fn y -> {x1, y} end)
            y1 === y2 -> Enum.map(x1..x2//dx, fn x -> {x, y1} end)
            diagonal -> Enum.map(x1..x2//dx, fn x -> {x, y1 + (x-x1)*dx*dy} end)
            true -> []
        end
    end

    def solve(lines, withDiagonal) do
        lines
        |> Enum.map(fn line -> make_line(line, withDiagonal) end)
        |> Enum.flat_map(fn l -> l end)
        |> Enum.sort_by(fn {x,y} -> x*10000+y end)
        |> Enum.chunk_by(fn coord -> coord end)
        |> Enum.filter(fn arg -> Enum.count(arg) > 1 end)
        |> Enum.count()
    end
end

{:ok, content} = File.read("./data.txt")

lines = content
|> String.trim()
|> String.split("\n")
|> Enum.map(fn line ->
    line
    |> String.split(" -> ")
    |> Enum.map(fn coords ->
        coords
        |> String.split(",")
        |> Enum.map(fn v -> String.to_integer(v) end)
        |> List.to_tuple()
    end)
end)

IO.puts(Main.solve(lines, false))
IO.puts(Main.solve(lines, true))
