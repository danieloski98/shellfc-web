'use client';
import httpClient from '@/lib/http-client';
import { Box, Flex, VStack, Text, Input, Button, Spinner } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query';
import { toaster } from "@/components/ui/toaster"
import React from 'react'
import { useRouter } from 'next/navigation';

function AdminLoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const router = useRouter();

    const { status, mutate } = useMutation({
        mutationFn: (data: { email: string, password: string }) => httpClient.post(`/admin/login`, data),
        onSuccess: (data) => {
            console.log(data?.data);
            toaster.create({
                title: 'Success',
                description: data?.data?.message,
                type: 'success',
            });
            router.push('/admin/dashboard')
        },
        onError: (error: any) => {
            toaster.create({
                title: 'An Error occured',
                description: error?.response?.data?.message,
                type: 'error',
            });
        }
    })
    return (
        <Box width='full' height="100vh" bg='#1a1a1a' py={'80px'} px={'50px'}>
            <Flex width="100%" height="100%">
                <VStack justifyContent={'center'} alignItems={'center'} width='50%' height={'100%'}>
                    <Text fontFamily='Fira Code' fontWeight="bold" fontSize={'34px'} color='white'>SHELL FC ADMIN</Text>
                </VStack>
                <Flex width='50%' height={'100%'} borderLeftWidth={'1.5px'} borderLeftColor={'lightGrey'} justifyContent={'center'} alignItems={'center'}>
                    <VStack width={'50%'} >
                        <Text fontFamily='Fira Code' fontWeight="bold" fontSize={'24px'} color='white'>Welcome</Text>
                        <Text fontFamily='Fira Code' fontWeight="normal" fontSize={'16px'} color='white'>Please login to admin panel.</Text>

                        <Box height='40px' />

                        <Input value={email} onChange={(e) => setEmail(e.target.value)} width="100%" height="55px" borderRadius={'10px'} bg='whitesmoke' px='10px' mt='20px' _placeholder={{ color: 'grey', fontFamily: 'Fira Code', fontWeight: 'normal' }} color="black" placeholder='Enter your email' />

                        <Input value={password} onChange={(e) => setPassword(e.target.value)} width="100%" height="55px" borderRadius={'10px'} bg='whitesmoke' px='10px' mt='1px' _placeholder={{ color: 'grey', fontFamily: 'Fira Code', fontWeight: 'normal' }} color="black" placeholder='Enter your password' />

                        <Button onClick={() => mutate({ email, password })} width='100%' height={'60px'} borderRadius={'5px'} mt='20px' bg='grey'>
                            {status === 'pending' && (
                                <Spinner size={'sm'} />
                            )}
                            {status !== 'pending' && (
                                <Text fontFamily={'Fira Code'} fontWeight={'medium'} color='white'>Login</Text>
                            )}
                        </Button>
                    </VStack>
                </Flex>
            </Flex>
        </Box>
    )
}

export default AdminLoginPage
