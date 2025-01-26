import * as yup from 'yup';
const scheduleValidationSchema = yup.object({
    meetingId: yup.string().required('Meeting ID is required'),
    // userName: yup.string().required('Your Name is required'),
    dateTime: yup.date().required('Date and Time is required'),
});

const joinMeetingSchema = yup.object({
    meetingId: yup.string().required('Meeting ID is required'),
    userName: yup.string().required('Your Name is required'),
});

const HostMeetingSchema = yup.object({
    meetingId: yup.string().required('Meeting ID is required'),
    userName: yup.string().required('Your Name is required'),
});

export {
    scheduleValidationSchema,
    joinMeetingSchema,
    HostMeetingSchema
}