import {Box, Button, HStack, IconButton, Text} from "@chakra-ui/react";
import React from "react";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = newPage => {
        if (newPage >= 0 && newPage < totalPages) {
            onPageChange(newPage);
        }
    };

    const generatePageNumbers = () => {
        let pages = [];
        pages.push(1);
        let startPage = Math.max(2, currentPage - 2);
        let endPage = Math.min(totalPages - 1, currentPage + 3);
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        if (totalPages > 1) {
            pages.push(totalPages);
        }
        return pages.filter((page, index, array) => array.indexOf(page) === index); // Ensure unique pages only
    };

    return (
        <HStack spacing="15px" justify="center" alignItems="center" marginTop="20px">
            <IconButton
                icon={<FiChevronsLeft />}
                onClick={() => handlePageChange(0)}
                disabled={currentPage === 0}
                variant="ghost"
                isRound
                aria-label="First page"
            />
            <IconButton
                icon={<FiChevronLeft />}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                variant="ghost"
                isRound
                aria-label="Previous page"
            />
            {generatePageNumbers().map((page) => (
                <Button
                    key={page}
                    onClick={() => handlePageChange(page - 1)}
                    aria-label={`Page ${page}`}
                    variant="ghost"
                    bgGradient={currentPage + 1 === page ? "linear(to-r, teal.300, green.400)" : "transparent"}
                    _hover={{
                        bgGradient: "linear(to-r, teal.400, green.500)",
                    }}
                    color={currentPage + 1 === page ? "white" : "gray.600"}
                >
                    {page}
                </Button>
            ))}
            <IconButton
                icon={<FiChevronRight />}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                variant="ghost"
                isRound
                aria-label="Next page"
            />
            <IconButton
                icon={<FiChevronsRight />}
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage >= totalPages - 1}
                variant="ghost"
                isRound
                aria-label="Last page"
            />
        </HStack>
    );
};

export default Pagination;