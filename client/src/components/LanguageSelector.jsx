import React from 'react';
import './CssForComponents.scss'

import {
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { LANGUAGE_VERSIONS } from "../utils/constraints";
const LanguageSelector = ({ language, onSelect }) => {
  const languages = Object.entries(LANGUAGE_VERSIONS);
  const ACTIVE_COLOR = 'blue.400';

  return (
    
    <Box ml={2} mb={4}>
      {/* <Text mb={2} fontSize="lg">
        Language:
      </Text> */}
      Language: &nbsp;&nbsp;&nbsp;&nbsp;
      <Menu className="Menu">
        <MenuButton as={Button}> {language}</MenuButton>
        <MenuList bg="#110c1b">
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? ACTIVE_COLOR : ''}
              bg={lang === language ? 'gray.900' : 'transparent'}
              _hover={{
                color: ACTIVE_COLOR,
                bg: 'gray.900',
              }}
              onClick={() => onSelect(lang)}
            >
              {lang}{' '}
              <Text as="span" color="gray.600" fontSize="sm">
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
        
      </Menu>
      
    </Box>
    
  );
};

export default LanguageSelector;
