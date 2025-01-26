import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import color from "../components/utils/Colors";


export default function CodeOfConduct() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (

        <>
            <Container maxWidth={false} sx={{
                lineHeight: '1.6875rem',
                padding: '1px 10px 75px 20px',
                color: color.firstColor
            }}>
            
                <Typography style={{ fontSize: isSmallScreen ? '22px' : '34px',fontWeight:'bold',color: color.firstColor, padding:'2%', paddingLeft:'0' }}>Code of Conduct</Typography>
                
                <p>Our <strong>Member Code of Conduct </strong>outlines our expectations regarding members’’ behavior towards their peers and the Voiceworld team.</p>



                <p>Through this policy we seek to promote freedom of expression and open communication and we also expect that all members on the Voiceworld platform follow our code of conduct.&nbsp;</p>



                <p>Members on the platform should avoid participating in serious disputes and causing chaos on the platform. We also expect them to foster a well-organized, respectful and collaborative environment.</p>



                <p>To help members fulfill these aims, outlined below are the basic principles and standards of professionalism to which all members must abide.&nbsp;</p>



                <p>Any member found guilty of violation of any section of this Code of Conduct will be subject to disciplinary action, up to, and including of the removal from the platform.&nbsp;</p>



                <p>Scope:</p>



                <p>This policy applies to all our members regardless of their employment rank in the organisation they represent.</p>



                <p><strong>Purpose:&nbsp;</strong></p>



                <p>Members should behave in a manner which demonstrates respect towards each other by observing the following:&nbsp;</p>



                <ol><li><strong>Show respect</strong> for the opinions, knowledge, living style, culture, customs, religion, beliefs and attitudes of other members of the site.</li><li><strong>Refrain from the exploitation or abuse</strong> of people’s personal (economic and sexual) vulnerability in the broadest possible sense, and any conduct which degrades the human dignity of individuals.&nbsp;&nbsp;</li><li><strong>Strive to be conscious and aware</strong> of possible, even unintended, consequences of behaviour and take these into account in their specific behaviour, speech and actions.&nbsp;</li></ol>



                <p><strong>Guiding Principles</strong></p>



                <p><strong>i. Respect</strong></p>



                <p>All members of the Voiceworld platform are expected to respect each other. The Voiceworld will not encourage any type of discriminatory behavior, harassment or victimization from one member to another.&nbsp;</p>



                <p>Every member on the platform shall conform to respecting each other regardless of one’s beliefs or cultural background.&nbsp;</p>



                <p>Voiceworld seeks to create and maintain a community in which people of many different backgrounds and cultures are treated with respect.</p>



                <p>ii. <strong>Religious Freedom</strong></p>



                <p>“Everyone has the right of freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.” (Universal Declaration of Human Rights, Article 18)&nbsp;&nbsp;</p>



                <p>A member should not be attacked because of their religious beliefs. Members should handle issues surrounding religion delicately or simply avoid them in general to avoid sparking conflict on the platform amongst each other.&nbsp;</p>



                <p>iii. <strong>Transparency and Truthfulness</strong></p>



                <p>While on the platform all members should strive for honesty in the information they display on their profiles as well as that they share with their peers.&nbsp;</p>



                <p>Any information provided by a member about themselves, their organisations or just general information they intend to share with other members on the platform should be accurate and true.&nbsp;</p>



                <p><strong>iv. </strong><strong>Accountability&nbsp;</strong></p>



                <p>Members should be well aware that the content they post is their responsibility. This means that if you post content that sparks a discussion that offends another member you should take full responsibility for the post and discuss with the offended person on how to resolve the issue.&nbsp;</p>



                <p>Voiceworld is not in control of what members post but will take action if the information displayed offends a member and they would like action taken against the offender.&nbsp;</p>



                <p>v. <strong>Confidentiality&nbsp;</strong></p>



                <p>Any classified information that is provided to Voiceworld members on the platform should not be shared outside of the platform by members, even if they cease being members of the platform, without consent from the Voiceworld team.</p>



                <p><strong>Compliance with the Code&nbsp;&nbsp;</strong></p>



                <ul><li>It is the personal responsibility of every member to understand and comply with the Code of Conduct.&nbsp;</li><li>Any problems encountered as well as any suggestions should be channeled to Halima Nsangou, the Community Engagement Manager, via the email community@voiceworld.org&nbsp; for consideration and advice.&nbsp;</li></ul>



                <p><strong>*Any member who violates any provision of the Code will be subject to disciplinary action.&nbsp;&nbsp;</strong></p>



                <p><strong>Disciplinary Actions</strong></p>



                <p>If a member on the platform violates the code of conduct they are issued with three written warnings whereby the third strike leads to disciplinary action that could either be suspension from the site for a period of time or complete expulsion – dependent on the violation-&nbsp;</p>



                <p><strong>Strike 1: Educate</strong></p>



                <p>A direct message either on the platform or via email will be sent to the member who violates the above code of conduct by the Voiceworld team, explaining why their post is not allowed.&nbsp;</p>



                <p><strong>Strike 2: Moderate</strong></p>



                <p>A second written notice of violation is sent to the member about their violation. This will either be done via phone call or video call clearly explaining to the member the consequences their violation has on the community.&nbsp;</p>



                <p><strong>Strike 3: Remove</strong></p>



                <p>At this point the Voiceworld team has given the said member two warnings. At this stage a member will either be suspended from the community for a period of time or expelled altogether – depending on the severity of their violation – This will be decided by the Voiceworld team.&nbsp;</p>



                <p><strong>*Please note that this strike policy does not apply to harassing behaviour. If a user harasses another user they only get one warning and then they are out.</strong></p>



                <p><strong>Dealing with Violations Publicly</strong></p>



                <p>If a members’ offensive post has already been seen by other users on the platform and has been flagged before any member of the Voiceworld team could attend to it the Voiceworld team will:&nbsp;</p>



                <ol><li>Respond to the thread, saying that the post was in violation of the code of conduct, stating the specific reason why and linking to the guidelines.</li><li>Close the thread.</li><li>Remove the thread, if necessary.</li></ol>
            </Container >
        </>
    )
}