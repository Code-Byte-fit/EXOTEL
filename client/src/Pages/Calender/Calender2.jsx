import React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';

 

const appointments = [
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2023, 5, 5, 9, 35),
    endDate: new Date(2023, 5, 6, 9, 35),
    id: 0,
    roomId: 1,
  },
  {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2023, 5, 4, 9, 35),
    endDate: new Date(2023, 5, 5, 9, 35),
    id: 1,
    roomId: 3,
  },
  {
    title: 'Install New Router in Dev Room',
    startDate: new Date(2023, 5, 4, 9, 35),
    endDate: new Date(2023, 5, 5, 9, 35),
    id: 2,
    roomId: 2,
  },
  
];

const roomResources = [
  {
    fieldName: 'roomId',
    title: 'Room',
    instances: [
      { id: 1, text: 'Room 1' },
      { id: 2, text: 'Room 2' },
    ],
  },
];

const currentDate = '2023-06-04';



export default function Calendar2() {
  return (
    <Paper>
      <Scheduler data={appointments} height={660}>
        <ViewState defaultCurrentDate={currentDate} />
        <MonthView/>
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <Resources data={roomResources} mainResourceName="roomId" />
      </Scheduler>
    </Paper>
  );
}

// const { host } = useContext(AppContext);
// const [reservations, setReservations] = useState([]);
// const [rooms, setRooms] = useState([]);

// const schedulerRef = useRef();
// const getScheduler = () => schedulerRef.current.control;

// useEffect(() => {
//   axios.get(`${host}/reservations/`).then((response) => {
//     setReservations(response.data);
//   });
//   axios.get(`${host}/rooms`).then((response) => {
//     console.log(response.data);
//     setRooms(response.data);
//   });
// }, []);

// const resources = rooms.map((room) => ({
//   name: room.RoomNo,
//   id: room.RoomNo,
// }));