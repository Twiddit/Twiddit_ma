import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import Twiddit from '../components/Twiddit';
const { width } = Dimensions.get('screen');

import { twidditFeed } from "../gql/queries"
import { useQuery } from "@apollo/client";

export default function Home (props) {
  const [clicked, setClicked] = useState(false);
    return (
      <Text>Bienvenido a Twiddit! </Text>
    )
    }
  

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

