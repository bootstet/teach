import React, { useState } from 'react'
import Link from 'next/link'
import styles from './index.module.css'
import { observer } from 'mobx-react-lite'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button
} from "@chakra-ui/react"

function UrlList({ urlListPageStore = {} }) {
  const { createUrlStore, urls = [] } = urlListPageStore
  const [ visible, setVisible ] = useState(false)
  const [ name, setName ] = useState('')
  const [ url, setUrl ] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  const UrlItem = ({obj}) =>  (
    <div 
      className={styles.item} 
      onClick={() => window.location = `http://${obj.url}`}
    >
      <div className={styles.itemIcon}>
        { obj.name && 
          <div className={styles.con}>{obj.name.slice(0,1)}</div>
        }
      </div>
      <div className={styles.name}>{obj.name}</div>
    </div>
  )

  const addUrl = (obj) => {
    createUrlStore({
      name,
      url
    })
    setName('')
    setUrl('')
    onClose()
  }
  
  return (
    <div className={styles.container}>
      {
        urls.map(item => <UrlItem key={item.id} obj={item}/>)
      }
      <div className={styles.item} onClick={onOpen}>
        <div className={styles.itemIcon}>
          <div className={styles.con}>+</div>
        </div>
        <div className={styles.name}>添加快捷方式</div>
      </div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>添加快捷方式</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>名称</FormLabel>
              <Input 
                ref={initialRef}  
                value={name}
                onChange={val => setName(val.target.value)}
                />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>网址</FormLabel>
              <Input 
                value={url}
                onChange={val => setUrl(val.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>取消</Button>
            <Button colorScheme="blue" mr={3} onClick={() => addUrl()}> 
              完成
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default observer(UrlList)