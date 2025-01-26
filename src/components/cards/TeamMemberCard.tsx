import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import color from '../utils/Colors';

type TeamMemberCardProps = {
    name: string;
    image: string;
    post: string;
    description: string;
    linkedIn: string;
    instagram: string;
    facebook: string;
    mail: string;
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, image, post, description, linkedIn, instagram, facebook, mail }) => {
    const cardStyle = {
        maxWidth: 300,
        margin: '20px auto',
        borderRadius: '12px',
        overflow: 'visible',
        position: 'relative',
        backgroundSize: '200% 200%',
        animation: 'moveBackground 5s ease infinite',
        boxShadow: 'none',
    };

    const contentStyle = {
        padding: '0px',
        height: 'fit-content',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '200px',
        transition: 'min-height 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    };

    const hoverStyle = {
        ...contentStyle,
        minHeight: '400px',
        boxShadow: '10px 10px 25px rgba(0,0,0,0.1)',
    };

    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <style>{`
                @keyframes moveBackground {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                .blurred-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: 'inherit';
                    filter: blur(100px);
                    z-index: -1;
                }
                .team_icon {
                    transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
                      color: ${color.sidebarButton};
                }
                .team_icon:hover {
                    transform: scale(1.5) rotate(360deg);
                    color: ${color.sidebarButton};
                }
            `}</style>
            <Card className="blurred-card" sx={cardStyle}>
                <CardContent sx={isHovered ? hoverStyle : contentStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <div style={{
                        background: color.sidebarButton,
                        borderRadius: '8px 8px 0px 0px',
                        paddingTop: '35px',
                        paddingBottom: '20px',
                        position: 'absolute',
                        top: '2%',
                        left: '50%',
                        transform: 'translate(-50%,-10%)',
                        width: '100%',
                        animation: 'moveBackground 5s ease infinite',
                        backgroundSize: '200% 200%',
                        boxShadow: '0px 10px 25px rgba(0,0,0,0.2),10px -5px 15px rgba(0, 0, 0, 0.158) inset',
                    }}>
                        <Avatar src={image} alt={name} style={{ width: 100, height: 100, margin: '0 auto' }} />
                        <Typography variant="h6" component="h2" style={{ textAlign: 'center', color: color.sidebarButtonText, marginTop: 10 }}>
                            {name}
                        </Typography>
                        <Typography variant="subtitle1" component="h3" style={{ textAlign: 'center', color: color.sidebarButtonText, }}>
                            {post}
                        </Typography>
                    </div>

                    <div style={{
                        display: 'flex', flexDirection: 'column', padding: '5px 20px', gap: '5px', justifyContent: 'flex-start',
                        height: '50px',
                        marginTop: 180
                    }}>
                        <Typography variant="body2" component="p" style={{ textAlign: 'center' }}>
                            {description}
                        </Typography>
                    </div>

                    <div style={{
                        background: color.sidebarButton,
                        borderRadius: '0px 0px 6px 6px',
                        padding: '5px 45px',
                        display: 'flex',
                        color: 'white',
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        height: '50px',
                        left: '50%',
                        transform: 'translate(-50%,0%)',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        animation: 'moveBackground 5s ease infinite',
                        backgroundSize: '200% 200%',
                        boxShadow: '0px -10px 25px rgba(0,0,0,0.2),10px -5px 15px rgba(0, 0, 0, 0.158) inset',
                    }}>
                        <a href={`mailto:${mail}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                            <EmailRoundedIcon className='team_icon' />
                        </a>

                        <a href={linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                            <LinkedInIcon className='team_icon' />
                        </a>
                        <a href={instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                            <InstagramIcon className='team_icon' />
                        </a>
                        {/* <a href={facebook} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                            <FacebookIcon className='team_icon' />
                        </a> */}

                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default TeamMemberCard;
