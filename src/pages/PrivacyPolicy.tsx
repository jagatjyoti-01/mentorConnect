import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import color from "../components/utils/Colors";

export default function PrivacyPolicy() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <>
            <Container maxWidth={false} sx={{
                lineHeight: '1.6875rem',
                padding: '1px 10px 75px 20px',
                color: color.firstColor
            }}>
            
                <Typography style={{ fontSize: isSmallScreen ? '22px' : '34px',fontWeight:'bold',color: color.firstColor, padding:isSmallScreen ? '16px' : '22px', paddingLeft:'0px' }}>Privacy Policy</Typography>
                

                <p><span style={{ textDecoration: 'underline' }}><strong>Policy Content</strong></span></p>



                <p>Voiceworld is committed to ensuring the privacy of all our members and users of our services.&nbsp;&nbsp;</p>



                <p>This policy represents our commitment as a global online platform to your right to privacy, giving you a clear explanation about how we use your information and your rights over that information.&nbsp;</p>



                <p><span style={{ textDecoration: 'underline' }}><strong>The types of information we collect and why</strong></span></p>



                <p>The type and amount of information we receive and store depends on how you use our website.&nbsp;</p>



                <p>In some circumstances your information may be shared with third parties, but only where you have specifically consented.&nbsp;</p>



                <p>We collect personal information in the following ways:&nbsp;</p>



                <ul>
                    <li>When you sign up to become a Voiceworld member&nbsp;</li>
                    <li>When you register for an event (both in person meetings and online webinars)&nbsp;</li>
                    <li>When you participate in a research exercise&nbsp;</li>
                </ul>



                <p>If you choose to provide them, we can collect the following types of personal information from you:&nbsp;</p>



                <ul>
                    <li>Name&nbsp;</li>
                    <li>Age&nbsp;</li>
                    <li>Address&nbsp;</li>
                    <li>Email address&nbsp;</li>
                    <li>Phone number&nbsp;</li>
                    <li>Nationality&nbsp;</li>
                    <li>Organization&nbsp;</li>
                    <li>Gender&nbsp;</li>
                    <li>Date of birth&nbsp;</li>
                    <li>Job Title&nbsp;</li>
                </ul>



                <p>The data sources that we can use to collect personal information from you:</p>



                <ul>
                    <li>Our website</li>
                    <li>Our membership application</li>
                    <li>Event registration applications</li>
                    <li>Survey forms</li>
                    <li>Email correspondence</li>
                </ul>



                <p><span style={{ textDecoration: 'underline' }}><strong>How we use the information collected</strong></span></p>



                <p>We use your personal information collected via our websites and other electronic communications for the following purposes:&nbsp;</p>



                <ul>
                    <li>To update you on our campaigns and activities&nbsp;</li>
                    <li>To administer your Voiceworld membership&nbsp;</li>
                    <li>To follow up with you on your expression of interest to join Voiceworld as a member&nbsp;</li>
                    <li>To improve our website</li>
                    <li>To create user accounts</li>
                    <li>To fulfill any legal obligations&nbsp;</li>
                    <li>To conduct trend analysis to ensure we are acting as a diverse and inclusive alliance&nbsp;</li>
                    <li>To share your data with trusted third parties</li>
                </ul>



                <p><span style={{ textDecoration: 'underline' }}><strong>Legal basis of processing&nbsp;</strong></span></p>



                <p>Data protection laws, including the General Data Protection Regulation 2016/679, the Protection of Personal Information Act and others in relevant jurisdictions, require us to have a legal justification to process your personal information. We use the following depending on the type of data and the type of processing:&nbsp;</p>



                <p><span style={{ textDecoration: 'underline' }}><strong>Consent</strong>&nbsp;&nbsp;</span></p>



                <p>We require your consent to send you our communications, for example to send you emails to update you on our work and our campaigns. We will only process your information in this way if you consent.&nbsp;&nbsp;</p>



                <p><span style={{ textDecoration: 'underline' }}><strong>Legitimate interest&nbsp;&nbsp;</strong></span></p>



                <p>For administration and operational management, we sometimes will share your personal information for the purpose of events management.</p>



                <p><span style={{ textDecoration: 'underline' }}><strong>Legal obligation&nbsp;&nbsp;</strong></span></p>



                <p>We will process your personal information to fulfill any legal obligations placed upon us, such as the prevention of fraud. We will also process your personal information if lawfully required to do so by a legal authority or a court of law.&nbsp;</p>



                <p><span style={{ textDecoration: 'underline' }}><strong>Security&nbsp;&nbsp;</strong></span></p>



                <p>We take appropriate security measures to ensure that we keep your information secure, accurate and up to date. We also take care to ensure that we have secure systems for processing payments through our payment services provider. – For when we begin charging memberships.</p>



                <p><span style={{ textDecoration: 'underline' }}><strong>Who has access to your data?&nbsp;</strong></span></p>



                <p>Voiceworld will not sell your data to any other organisation and will only share your details with trusted service providers. For the personal details you submit to us via an online form, authorized staff will be able to view this information. We take precautions to keep your personal details secure. We conduct routine security checks of our systems which store personal information.</p>



                <p><span style={{ textDecoration: 'underline' }}><strong>Payment processing and fraud&nbsp;&nbsp;</strong></span></p>



                <p>Where submitted, your card details may be disclosed to banks or relevant financial institutions to arrange payments. In the case of a suspected fraudulent transaction, your details may be further disclosed for the sole purpose of performing further checks (for example, disclosure to a credit checking agency).&nbsp;</p>



                <p><span style={{ textDecoration: 'underline' }}><strong>Other sharing&nbsp;&nbsp;</strong></span></p>



                <p>We may also share your personal information with your permission, or if we are legally required to disclose your information in circumstances where this cannot be reasonably resisted.</p>



                <p><span style={{ textDecoration: 'underline' }}><strong>Retention of Data&nbsp;</strong></span></p>



                <p>You can have your personal data erased from our servers, by sending us an email <a href="community@voiceworld.org">here</a>. The length of time we will retain data varies depending on how long we need to process it for, the reason it was collected and in line with any statutory requirements. After this time the data will either be deleted or we may retain a secure anonymized record for research and analytical purposes.&nbsp;</p>



                <p><span style={{ textDecoration: 'underline' }}><strong>Access to and your rights over your personal information&nbsp;</strong></span></p>



                <p>The personal data we hold about you is yours. You have the following rights over your information:&nbsp;</p>



                <ul>
                    <li>To be informed how your data is being processed&nbsp;</li>
                    <li>To access your data</li>
                    <li>To rectify any data that is inaccurate&nbsp;</li>
                    <li>To instruct us to delete your data&nbsp;</li>
                    <li>To restrict our processing of your data (which includes contacting you via email) at any time. All our email communications to you will contain an unsubscribe link.&nbsp;</li>
                    <li>To object to your data being stored.&nbsp;</li>
                    <li>To move your data&nbsp;</li>
                </ul>



                <p><span style={{ textDecoration: 'underline' }}><strong>Complaints&nbsp;</strong></span></p>



                <p>If you wish to lodge a complaint about our handling of your personal data please get in touch with us using the above details; we will respond to all complaints within one month but aim to respond earlier.&nbsp;&nbsp;</p>



                <p>If you are dissatisfied with how we have handled your complaint you can lodge a complaint with your Data Protection Authority.</p>



                <p><span style={{ textDecoration: 'underline' }}><strong>What personal data we collect and why we collect it</strong></span></p>



                <p>i. Comments</p>



                <p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.</p>



                <p>ii. Media</p>



                <p>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p>



                <p>iii. Feedback forms</p>



                <p>If you provide us feedback via the feedback form we collect information on the pages you visited, the visitor’s IP address and browser user agent string&nbsp;</p>



                <p>iv. Cookies</p>



                <p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p>



                <p>If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p>



                <p>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p>



                <p>If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p>



                <p>v. Embedded content from other websites</p>



                <p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>



                <p>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p>



                <p><span style={{ textDecoration: 'underline' }}><strong>Changes to Our Privacy Policy&nbsp;</strong></span></p>



                <p>In the event that we make any changes to our privacy policy, they will be posted on this page.&nbsp;</p>



                <p><span style={{ textDecoration: 'underline' }}><strong>Contact</strong></span></p>



                <p>If you have any questions, comments, complaints or suggestions in regards to this privacy policy we invite you to address them to <a style={{textDecoration:'none'}} href="community@voiceworld.org">this email</a> for support.</p>
            </Container >
        </>
    )
}