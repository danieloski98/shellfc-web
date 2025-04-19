'use client';
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import CustomInput from "@/components/custom/CustomInput";
import httpClient from "@/lib/http-client";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

export default function Home() {
  const router = useRouter();

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: async (values: SignUpFormValues) => {
      const response = await httpClient.post('/auth/register', values);
      return response.data;
    },
    onSuccess: (data) => {
      // Store the token if it's returned from the API
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      // Redirect to dashboard or home page
      router.push('/dashboard');
    },
    onError: (error) => { }
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      signUp(values);
    },
  });

  return (
    <Box width="100%" height={'100vh'}>
      <Flex width='100%' height="100%" flexDirection={['row', 'row']}>
        <Box width={['0%', '60%']} backgroundColor={'red'}>
          <Image src="/bg.png" width='100%' height={'100%'} objectFit={'cover'} />
        </Box>
        <Box width={['100%', '40%']} height={'100%'} backgroundColor={'white'} px={[5, 10]} py={[5]}>
          <Text color="black" fontSize={'2xl'}>Shell FC Registration</Text>
          <Flex spaceY={0} width={['100%', '100%']} height={'100%'} justifyContent={'center'} alignItems={'center'} >
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
