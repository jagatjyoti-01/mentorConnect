import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box, Typography } from '@mui/material';
import color from '../utils/Colors';

interface ItemProps {
  item: {
    image: string;
  };
}

function Item({ item }: ItemProps) {
  return (
    <Paper
      sx={{
        position: 'relative',
        height: '100%',
        boxShadow: 'none',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 600px)': {
          borderRadius: '8px',
        },
      }}
    >
      <Box
        component="img"
        src={item.image}
        sx={{
          width: '100%',
          position: 'relative',
          maxHeight: '350px',
          borderRadius: '16px',
          objectFit: 'contain',
          '@media (max-width: 600px)': {
            borderRadius: '8px',
          },
        }}
      >
      </Box>

      {/* <Typography style={{
        position: 'absolute', left: '1.5%', top: '3%',
        fontSize: 'clamp(2px, 1.5vw, 16px)', fontWeight:'bold',
        color: color.bannerText
      }}>
   | Upcoming Event
      </Typography>


      <Typography style={{
        position: 'absolute', right: '7%', top: '6%',
        fontSize: 'clamp(8px, 3.5vw, 45px)',
        color: color.bannerText
      }}>
        KORIA VILLANUEVA
      </Typography>

      <Typography style={{
        position: 'absolute', right: '6%', top: '22%',
        fontSize: 'clamp(4px, 3vw, 34px)',
        color: color.bannerText
      }}>
        Social Activists
      </Typography>


      <Typography style={{
        position: 'absolute', right: '6%', top: '48%',
        fontSize: 'clamp(2px, 1.5vw, 20px)',
        color: color.bannerText
      }}>
      Uncovering the Upcoming Trends in Social
      </Typography>
      <Typography style={{
        position: 'absolute', right: '6%', top: '58%',
        fontSize: 'clamp(2px, 1.5vw, 20px)',
        color: color.bannerText
      }}>
       Activism with- KORIA VILLANUEVA
      </Typography>



      <Typography style={{
        position: 'absolute', right: '6%', bottom: '13%',
        fontSize: 'clamp(2px, 1.5vw, 20px)',
        color: color.bannerText
      }}>
      2 August 2024 | Friday
      </Typography>
      <Typography style={{
        position: 'absolute', right: '6%', bottom: '4%',
        fontSize: 'clamp(2px, 1.5vw, 20px)',
        color: color.bannerText
      }}>
      7:00 PM- 9:00 PM
      </Typography> */}


    </Paper>
  );
}

const AutoSlider: React.FC = () => {


  const items = [
    {
      image: '/images/banner1.png',
    },
    {
      image: '/images/banner3.png',
    },
    {
      image: '/images/banner2.png',
    },

  ];

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        borderRadius: '16px',
      }}
    >
      <Carousel
        autoPlay={true}
        interval={5000}

        sx={{
          width: '100%',
          maxHeight: '450px',
          borderRadius: '16px',
        }}
      >

        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Box>
  );
};

export default AutoSlider;
