export default function  getSkills(arraofSkills: any[],prop: string) {
    return [...arraofSkills.map((o: any)=> o[prop])].join();
}

export function formatDate(userDate: any) {
    // format from M/D/YYYY to YYYYMMDD
    if(userDate)
    return (new Date(userDate).toJSON().slice(0, 10).split('-').reverse().join('-'));
else return (new Date().toJSON().slice(0, 10).split('-').reverse().join('-'));
}


export function formatDateTime(userDate: any) {
    // format from M/D/YYYY to YYYYMMDD
    let date = new Date(userDate);
    var hours = date.getHours();
    let minutes: any = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;

}