import { Flex, Center, Text, Avatar } from "@chakra-ui/react"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';

const delay = ms => new Promise(res => setTimeout(res, ms));

const LeaderboardEntry = ( { row , index} ) => {
    const [newRow, setNewRow] = useState()
    const [oldRow, setOldRow] = useState()

     useEffect(() => {
        async function setRows(){
            if(oldRow && (oldRow.score !== row.score)){
                setNewRow(row)
                await delay(2100)
                setOldRow(row)
            }
            else{
                setNewRow(row)
                setOldRow(row)
            }
        }
        setRows()
    }, [row]) 

    return(
                <>
                {oldRow && newRow &&
                <motion.div
                    animate={{scale: newRow.score == oldRow.score ? '1' : '1.03'}}>                
                    <Flex 
                        flexDir={'row'}   
                        key={`row-${row.username}`} 
                        py={3} px={1} mb={6}
                        flexGrow={1}
                        borderRadius="lg"
                        borderLeft="2px"
                        borderColor={newRow.score == oldRow.score ? 'teal.100' : 'teal.400'}
                        h='40px' 
                        justify={'space-between'}
                        alignItems={'center'}
                        >
                        <Flex          
                            flexGrow={1}
                            flexDir='row' >
                            <Center>
                                <Avatar 
                                    key={`${row.username}-avatar`} 
                                    mr={2} 
                                    src={require(`../../avatars/${row.avatarSrc}`)}
                                    size='sm'>
                                </Avatar>
                                <Flex key={row.username} flexDir={'column'}>
                                    <Text 
                                        mb={0}
                                        fontWeight={'normal'} 
                                        fontSize='sm'>
                                            {row.username}
                                    </Text>
                                    <Text 
                                        as='em' 
                                        color={'gray.600'} 
                                        fontSize='xs' 
                                        fontWeight={'extrabold'}>
                                        {/* {oldRow.score} */}
                                        <CountUp
                                            duration={2} 
                                            start={oldRow.score} end={newRow.score}
                                        />
                                    </Text>
                                </Flex>
                            </Center>
                        </Flex>
                        <Text mb={0} fontWeight={'semibold'} fontSize='xl'>
                            {index}
                            {/* <CountUp separator="," duration={2} start={oldRow.noFundedLifetime} end={newRow.noFundedLifetime}/>    */}
                        </Text>
                    </Flex>
                </motion.div>
            }
            </>
    )
}

export default LeaderboardEntry