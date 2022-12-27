import React, { useState } from 'react';
import './App.css';
import moment from 'moment';
import shortid from 'shortid';

function DateTime(props) {
  return <p className="date">{props.date}</p>;
}

function chooseSuffix(number, suffices) {
  if (number >= 11 && number <= 14) {
    return suffices[2]
  }
  const c = number % 10;
  if (c === 1) {
    return suffices[0];
  }
  if (c >= 2 && c <= 4) {
    return suffices[1];
  }
  return suffices[2];
}

function DateTimePretty(props) {
  let prettyDate = props.date;
  const minutes = moment().diff(props.date, 'minutes');
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(minutes / 60 / 24);
  if (days > 0) {
    prettyDate = `${days} ${chooseSuffix(days, ['день', 'дня', 'дней'])} назад`;
  } else if (hours > 0) {
    prettyDate = `${hours} ${chooseSuffix(hours, ['час', 'часа', 'часов'])} назад`;
  } else if (minutes > 0) {
    prettyDate = `${minutes} ${chooseSuffix(minutes, ['минута', 'минуты', 'минут'])} назад`;
  }
  return <DateTime {...props} date={prettyDate} />;
}

function Video(props) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <DateTimePretty date={props.date} />
    </div>
  );
}

function VideoList(props) {
  return props.list.map((item) => <Video key={item.id} url={item.url} date={item.date} />);
}

export default function App() {
  const [list, setList] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00',
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00',
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: moment().subtract(15, 'hour'),
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: moment().subtract(12, 'minute'),
    },
  ].map((obj) => ({...obj, id: shortid()})));

  return <VideoList list={list} />;
}
