"use client";
import { useEffect, useState } from "react";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import styled from "styled-components";

type Props = {
  filter: "all" | "pending" | "completed";
  setFilter: (value: "all" | "pending" | "completed") => void;
  query: string;
  setQuery: (value: string) => void;
};

const FiltersWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin: 8px 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

const SearchInput = styled(Input)`
  flex: 1;
  min-width: 200px;

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  
  @media (max-width: 768px) {
    width: 100%;
    
    button {
      flex: 1;
    }
  }
`;

export default function TaskFilters({ filter, setFilter, query, setQuery }: Props) {
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(localQuery);
    }, 500);
    return () => clearTimeout(timeout);
  }, [localQuery, setQuery]);

  return (
    <FiltersWrapper>
      <SearchInput
        placeholder="جست‌وجو..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      <ButtonGroup>
        <Button
          variant={filter === "all" ? "primary" : "secondary"}
          onClick={() => setFilter("all")}
        >
          همه
        </Button>
        <Button
          variant={filter === "pending" ? "primary" : "secondary"}
          onClick={() => setFilter("pending")}
        >
          فعال
        </Button>
        <Button
          variant={filter === "completed" ? "primary" : "secondary"}
          onClick={() => setFilter("completed")}
        >
          تکمیل شده
        </Button>
      </ButtonGroup>
    </FiltersWrapper>
  );
}