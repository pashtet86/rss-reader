export default {
  core: {
    notification: {
      type: 'success',
      message: ''
    },
  },
  rssChannels:{
    isFetching: true,
    selectedChannel: null,
    currentFeedItem: {},
    channelData: {
      items: [],
    },
    // mocked data ❗️
    list: [{
      id: 1,
      name: 'React',
      image: 'react.png',
      url: 'https://reactjs.org/feed.xml '
    },
    {
      id: 2,
      name: 'Stackoverflow',
      image: 'sof.jpg',
      url: 'https://stackoverflow.com/feeds',
    },
    {
      id: 3,
      name: 'DEV',
      image: 'dev.png',
      url: 'dev.to/feed/',
    }],
  }
};
