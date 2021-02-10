import React from "react";
import {
  Input,
  InputGroup,
  Stack,
  InputLeftAddon,
  FormHelperText,
  Button,
  FormControl
} from "@chakra-ui/core";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useFormik } from 'formik';
import axios from 'axios';

export default function SignIn() {

  const onSubmit = (values) => {
    console.log('values', values)
    const params = {
      username: values.username,
      email: values.email,
      password: values.password
    }
    axios({
      method: 'post',
      url: 'https://conduit.productionready.io/api/users',
      data: {
        "user": params
      },
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
  }

  const initialValues = {
    username: '',
    email: '',
    password: '',
  }
  const formik = useFormik({ initialValues, onSubmit})
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing="2">
        <FormControl isInvalid>
          <InputGroup>
            <InputLeftAddon children={<FaUserAlt />} />
            <Input 
              placeholder="请输入用户名" 
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </InputGroup>
          <FormHelperText>用户名是填项</FormHelperText>
        </FormControl>
        <InputGroup>
          <InputLeftAddon children={<FaLock />} />
          <Input 
            placeholder="邮箱" 
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children={<FaLock />} />
          <Input 
            type="password" 
            placeholder="设置密码" 
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </InputGroup>
        <Button type="submit" _hover={{ bgColor: "tomato" }} w="100%" colorScheme="teal">
          注册
        </Button>
      </Stack>
    </form>
  );
}
