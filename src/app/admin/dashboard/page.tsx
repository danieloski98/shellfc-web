'use client';
import httpClient from '@/lib/http-client';
import { IUser } from '@/models/users.model';
import { Box, Flex, VStack, Text } from '@chakra-ui/react'
import { Table } from "@chakra-ui/react"
import { useQuery } from '@tanstack/react-query';
import React from 'react'

function Dashboard() {
    const [users, setUsers] = React.useState<IUser[]>([])
    const { isLoading, data } = useQuery({
        queryKey: ['get-users'],
        queryFn: () => httpClient.get('/users', {
            params: {
                page: 1,
                limit: 10,
            }
        }),
    });

    React.useEffect(() => {
        console.log(data?.data?.data);
        setUsers(data?.data?.data ?? []);
    }, [data?.data])


    return (
        <Box width='100%' height={'100vh'} bg='#1a1a1a'>
            <Flex width='100%' height={'100vh'} >
                <VStack width='20%' height="full" borderRightWidth={'0px'} borderRightColor={'grey'}>
                    <Text fontFamily='Fira Code' fontWeight="bold" fontSize={'20px'} color='white' mt='20px'>Shell FC</Text>
                    <VStack flex='1' width={'full'} pl={'20px'} mt='30px' alignItems={'flex-start'}>
                        <Text fontFamily='Fira Code' fontWeight="noraml" fontSize={'14px'} color='white' mb='20px'>Dashboard</Text>
                        <VStack bg='#272727' width='full' height='40px' justifyContent={'center'} alignItems={'flex-start'} pl='5px' mb='10px'>
                            <Text fontFamily='Fira Code' fontWeight="noraml" fontSize={'14px'} color='white'  >Members</Text>
                        </VStack>
                        <Text fontFamily='Fira Code' fontWeight="noraml" fontSize={'14px'} color='white' mb='20px'>Applications</Text>
                        <Text fontFamily='Fira Code' fontWeight="noraml" fontSize={'14px'} color='white' mb='20px'>Events</Text>
                        <Text fontFamily='Fira Code' fontWeight="noraml" fontSize={'14px'} color='white' mb='20px'>Contents</Text>
                        <Text fontFamily='Fira Code' fontWeight="noraml" fontSize={'14px'} color='white' mb='20px'>Admins</Text>
                    </VStack>
                </VStack>

                <VStack bg="#272727" height='100%' width='80%'>
                    <Flex width='100%' height="10%" borderBottomWidth={'1px'} borderBottomColor={'grey'} px='20px' alignItems={'center'}>
                        <Text fontFamily='Fira Code' fontWeight="bold" fontSize={'24px'} color='white'>Members</Text>
                    </Flex>

                    <Box overflowY={'auto'} px='20px' pt='10px' width='full'>
                        {isLoading && (<></>)}
                        {!isLoading && data?.data && (
                            <Table.Root size="sm" striped width={'full'}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeader>S/N</Table.ColumnHeader>
                                        <Table.ColumnHeader>Full Name</Table.ColumnHeader>
                                        <Table.ColumnHeader >Email</Table.ColumnHeader>
                                        <Table.ColumnHeader >Phone</Table.ColumnHeader>
                                        <Table.ColumnHeader >Membership Level</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {users.map((item, index) => (
                                        <Table.Row key={index.toString()}>
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <Table.Cell>{item?.firstName} {item?.lastName}</Table.Cell>
                                            <Table.Cell>{item?.email}</Table.Cell>
                                            <Table.Cell>{item?.phone}</Table.Cell>
                                            <Table.Cell>{item?.memberLevel}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        )}
                    </Box>
                </VStack>
            </Flex>
        </Box>
    )
}

export default Dashboard
