'use client';
import { Box, Button, Flex, Image, Portal, Select, Text, createListCollection } from "@chakra-ui/react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import CustomInput from "@/components/custom/CustomInput";
import httpClient from "@/lib/http-client";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster"
import React from 'react';


const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  dateJoined: Yup.string().min(8),
});

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

const items = createListCollection({
  items: [
    { label: 'Support Member', value: 'SUPPORT_MEMBER' },
    { label: 'Intending Support Member', value: 'INTENDING_SUPPORT_MEMBER' },
    { label: 'Senior Member', value: 'SENIOR_MEMBER' },
  ]
})

export default function Home() {
  const router = useRouter();
  const [memberType, setMemberType] = React.useState("SUPPORT_MEMBER");

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: async (values: any) => {
      const response = await httpClient.post('/auth/register', values);
      return response.data;
    },
    onSuccess: (data) => {
      toaster.create({
        title: 'Account Created!',
        description: 'Your account has been created successfully',
        type: 'success',
        closable: true,
      });
      // Store the token if it's returned from the API
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      // Redirect to dashboard or home page
    },
    onError: (error: any) => {
      console.log(error);
      toaster.create({
        title: 'Error',
        description: error?.response?.data?.message,
        type: 'error',
        closable: true,
      });
    }
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      dateJoined: ''
    },
    validationSchema,
    onSubmit: (values) => {

      signUp({
        ...values,
        memberLevel: memberType,
      });
    },
  });

  return (
    <Box width="100%" height={'100vh'}>
      <Flex width='100%' height="100%" flexDirection={['row', 'row']}>
        <Box width={['0%', '60%']} backgroundColor={'red'}>
          <Image src="/bg.png" width='100%' height={'100%'} objectFit={'cover'} />
        </Box>
        <Box width={['100%', '40%']} height={'100%'} backgroundColor={'white'} px={[5, 10]} py={[5]} overflowY={'auto'}>
          <Flex spaceY={0} width={['100%', '100%']} height={'100%'} justifyContent={'flex-start'} alignItems={'flex-start'} overflowY={'auto'} paddingTop={'10px'} paddingBottom={'100px'} flexDirection={'column'}>
            <Text color="black" fontSize={'2xl'}>Shell FC Registration</Text>

            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit} style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
                <Box spaceY={4} width={['100%', '60%']} height={'100%'} >
                  <CustomInput
                    label="First Name"
                    name="firstName"
                    placeholder="Enter your first name"
                  />
                  <CustomInput
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter your last name"
                  />
                  <CustomInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <CustomInput
                    label="Phone"
                    name="phone"
                    placeholder="Enter your phone number"
                  />
                  <CustomInput
                    label="Address"
                    name="address"
                    placeholder="Enter your address"
                  />
                  <CustomInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                  />

                  <CustomInput
                    label="Date Joined"
                    name="dateJoined"
                    type="datetime"
                    placeholder="MM-DD-YYYY"
                  />

                  <Select.Root collection={items} key="select" color={'grey'} _placeholder={{ color: 'grey' }}>
                    <Select.Label>Select Membership Level</Select.Label>
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select emebership level" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content paddingX={'10px'}>
                          {items.items.map((framework) => (
                            <Select.Item item={framework} key={framework.value}>
                              {framework.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>

                  {/* <Select. value={memberType} onChange={(e) => setMemberType(e.target.value)}>
                    <option value="SUPPORT_MEMBER">Support Member</option>
                    <option value="SENIOR_MEMBER">Senior Member</option>
                    <option value="INTENDING_SUPPORT_MEMBER">Intending Support Member</option>
                  </Select.> */}
                  <Button
                    type="submit"
                    width="100%"
                    height={'45px'}
                    loading={isPending}
                    backgroundColor={'2F68BC'}
                    colorPalette={'blue'}
                    borderRadius={'10px'}
                  // color='white'
                  >
                    Sign Up
                  </Button>
                </Box>
              </form>
            </FormikProvider>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
