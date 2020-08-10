import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

export default class Note extends Component {
  render() {
    const date = moment
      .unix(this.props.content.date / 1000)
      .format('MMMM Do YYYY');
    return (
      <NoteCard onClick={() => this.props.onClick(this.props.content)}>
        <Header>
          <Title>{this.props.content.title}</Title>
          <Date>{date}</Date>
        </Header>
        <Text>{this.props.content.text}</Text>
      </NoteCard>
    );
  }
}

const NoteCard = styled.div`
  width: 80%;
  background: #ffffff;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  &:hover {
    background: #f7f7f7;
    cursor: pointer;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 16px;
  margin: 0px 5px 0px 0px;
`;

const Date = styled.p`
  margin: 0 0 3px 0;
  font-weight: 400;
  font-size: 8px;
  color: #969696;
`;

const Text = styled.div`
  margin-top: 5px;
  font-weight: 400;
  font-size: 11px;
  line-height: 15px;
`;
