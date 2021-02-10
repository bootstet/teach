import React from "react";
import {
  Input,
  InputGroup,
  Stack,
  InputLeftAddon,
  FormHelperText,
  Switch,
  FormLabel,
  Flex,
  Button,
  FormControl
} from "@chakra-ui/core";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useFormik } from "formik";

import axios from 'axios'

export default function SignUp() {
  const submit = (values) => {
    console.log('values', values)
    const params = {
      user: {
        email: values.username,
        password: values.password
      }
    }
    axios({
      url: 'https://conduit.productionready.io/api/users/login',
      method: 'post',
      data: params,
      headers: { 'content-type': 'application/json' },
    }
    ).then(
      res => {
        console.log(res)
        alert('登陆成功')
      }
    ).catch(
      err => {
        console.error(err)
        alert('用户名或者密码错误，请重新输入')
      }
    )
  }
  const formik = useFormik({ initialValues: { username: "zhangsan", password: "123"}, onSubmit: submit})
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing="2">
        <FormControl isInvalid>
          <InputGroup>
            <InputLeftAddon children={<FaUserAlt />} />
            <Input 
              placeholder="手机号或邮箱" 
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
            type="password" 
            placeholder="密码" 
            name="password"
            value={formik.values.password} 
            onChange={formik.handleChange}
          />
        </InputGroup>
        <Flex>
          <Switch id="deal" mr="3" />
          <FormLabel htmlFor="deal">记住我</FormLabel>
        </Flex>
        <Button type="submit" _hover={{ bgColor: "tomato" }} w="100%" colorScheme="teal">
          登录
        </Button>
      </Stack>
    </form>
  );
}
