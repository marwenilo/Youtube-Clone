import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Videos, ChannelCard } from './';

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => {
        console.log(data);
        setVideos(data?.items);
      }
    );
  }, [id]);
  console.log(videos);
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              'radial-gradient(circle, rgba(0,61,179,1) 0%, rgba(179,0,118,0.6082808123249299) 100%)',
            zIndex: 10,
            height: '300px',
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '100px' } }}/>
          <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
