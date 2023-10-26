Provider
import { LocaleConfig, Calendar } from "react-native-calendars";

const [showdialog, setShowdialog] = useState(false);
const hideDialog = () => setShowdialog(false);
const [selecteddate, setSelecteddate] = useState(false);



<>
<View style={{flexDirection: 'row', alignItems: 'center'}}>
    <Text>Date of birth </Text>
    <Button icon="calendar-range" onPress={() => setShowdialog(true)}> select Date</Button>
</View>
<Portal>
    <Dialog visible={showdialog} onDismiss={hideDialog}>
        <Dialog.Content>
            <Calendar
                visible={true}
                onDayPress={(day) => {
                setSelecteddate(day.dateString);
                setDateofbirth(day.dateString);
                setShowdialog(false);
                }}
                markedDates={{
                    [selecteddate]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                }}
                    enableSwipeMonths={true}
                />

        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            </Dialog.Actions>
        </Dialog>
</Portal>
</>