import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

export default function AccountItem({ parentIcon, parentTitle, list, onNavigation }) {
  const [expanded, setExpanded] = useState(false);

  const clickEventListener = (key) => {
    if(parentIcon === 'settings'){
      if(key === 0) onNavigation.navigate('Search');
      if(key === 1) onNavigation.navigate('AccDetail');
    }
    if(parentIcon === 'account-circle'){
      if(key === 0) onNavigation.navigate('AccDetail');
      if(key === 1) onNavigation.navigate('ChangeAvatar'); 
      if(key === 2) onNavigation.navigate('ChangePassword');
    }
    if(parentIcon === 'help-outline') onNavigation.navigate('CreatePost');
  }

  return (
    <ListItem.Accordion
      style={{ marginVertical: 5, marginHorizontal: 15, borderRadius: 20 }}
      containerStyle={{ borderRadius: 20 }}
      content={
        <>
          <Icon name={parentIcon} size={30} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: 'bold' }}>{parentTitle}</ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      {list.map((item, i) => (
        <ListItem
          style={{ marginHorizontal: 30, borderRadius: 20, marginVertical: 5 }}
          containerStyle={{ borderRadius: 20 }}
          key={i}
          onPress={() => clickEventListener(i)}
        >
          <Icon name={item.icon} size={30} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </ListItem.Accordion>
  );
}
