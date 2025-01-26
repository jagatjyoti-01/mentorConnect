// OurTeam.jsx
import React from 'react';
import { Grid, Typography, Container } from '@mui/material';
import TeamMemberCard from '../components/cards/TeamMemberCard';
import color from '../components/utils/Colors';



const teamMembers = [
    {
        name: 'Manas Kumar Nandi',
        image: "/images/manas_pfp.jpeg",
        post: 'Senior Developer',
        description: 'Visionary leader guiding our team with expertise and innovation.',
        linkedIn: 'https://www.linkedin.com/in/manas-kumar-nandi-625615184',
        instagram: '',
        facebook: '',
        mail: 'manasnandi.innerstrength@gmail.com',
    },
    {
        name: 'Amitav Pusty',
        image: "/images/amitav_pfp.jpeg",
        post: 'Jr. Developer',
        description: 'Enthusiastic learner focused on growth and delivering quality work.',
        linkedIn: '',
        instagram: '',
        facebook: '',
        mail: '',
    },
    {
        name: 'Milan Ku. Behera',
        image: "/images/milan_pfp.jpeg",
        post: 'Jr. Developer',
        description: 'Passionate coder exploring innovative solutions and fresh ideas.',
        linkedIn: 'https://www.linkedin.com/in/milan-kumar-512478291',
        instagram: 'https://www.instagram.com/milanx.og/',
        facebook: '',
        mail: 'milankumar.xd@gmail.com',
    },
    {
        name: 'Shruti Gijare',
        image: "/images/shruti2_pfp.jpeg",
        post: 'UI/UX Designer',
        description: 'Creative designer crafting user-centric, intuitive, and engaging interfaces.',
        linkedIn: 'https://www.linkedin.com/in/shrutigijare',
        instagram: 'https://www.instagram.com/_shruti_gijare_?utm_source=qr&igsh=MTE1bjlrdmgwMWt1Zg==',
        facebook: '',
        mail: 'shrutigijare16@gmail.com',
    },
    {
        name: 'Jagat Jyoti Dash',
        image: 'url_to_eve_image',
        post: 'Trainee',
        description: 'Motivated trainee keen on learning and improving skills quickly.',
        linkedIn: '',
        instagram: '',
        facebook: '',
        mail: '',
    }
];





const OurTeam = () => {
    return (
        <Container sx={{mb:10}}>

            <Typography variant="h4" gutterBottom sx={{ color: color.firstColor,marginTop:5, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 }}>
                Our Team
            </Typography>


            <Grid container spacing={4} justifyContent="center">
                {teamMembers.map((member, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <TeamMemberCard
                            name={member.name}
                            image={member.image}
                            post={member.post}
                            description={member.description}
                            linkedIn={member.linkedIn}
                            instagram={member.instagram}
                            facebook={member.facebook}
                            mail={member.mail}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default OurTeam;
