import { Box, Flex, VStack, Text } from '@chakra-ui/react'
import React from 'react'

function Dashboard() {
    return (
        <Box width='100%' height={'100vh'} bg='#1a1a1a'>
            <Flex width='100%' height={'100vh'} >
                <VStack width='20%' height="full" borderRightWidth={'0px'} borderRightColor={'grey'}>
                    <Text>Shell FC</Text>
                </VStack>

                <VStack bg="#272727" height='100%' width='80%'>
                    <Flex width='100%' height="10%" borderBottomWidth={'1px'} borderBottomColor={'blackAlpha.700'}></Flex>
                </VStack>
            </Flex>
        </Box>
    )
}

export default Dashboard
