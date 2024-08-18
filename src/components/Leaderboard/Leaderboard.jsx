import React, { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { Reorder } from "framer-motion";
import LeaderboardEntry from './LeaderboardEntry'

export function Leaderboard({ currentData }) {
    const property = 'score'
    const [sortedData, setSortedData] = useState()

    useEffect(() => {
        const sortData = () => {
            if (currentData) {
                setSortedData(sortArrayByProperty());
            }
        }
        sortData()
    }, [currentData])

    const sortArrayByProperty = () => {
        return [...currentData].sort((a, b) => {
            return b.score - a.score;
        });
    }

    return (
        <>
            <div>
                <Flex p={3} flexDir={'column'} w={{ sm: '95%', lg: '50%' }} m={'auto'}>
                    {sortedData &&
                        <>
                            <Flex p={2}>
                                <Reorder.Group as='div' style={{ width: '100%' }}
                                    draggable={false}
                                    dragControls={false}
                                    dragListener={false}
                                    axis='y'
                                    values={sortedData}>
                                    {sortedData.map((row, index) => {
                                        return (
                                            <Reorder.Item
                                                as='div'
                                                key={`${row.username}`}
                                                dragListener={false}
                                                draggable={false}
                                                value={row}>
                                                <LeaderboardEntry
                                                    key={`${row.username}`}
                                                    row={row}
                                                    index={index + 1}
                                                    property={property}
                                                />
                                            </Reorder.Item>
                                        )
                                    })}
                                </Reorder.Group>
                            </Flex>
                        </>
                    }
                </Flex>
            </div>
        </>

    )
}
