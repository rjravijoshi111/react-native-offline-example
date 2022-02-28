import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        padding: 10
    },
    titleContainer: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 10
    },
    title: {
        fontSize: 14,
        color: 'black',
        borderRadius: 17,
        marginVertical: 5
    },
    link: {
        fontSize: 14,
        color: 'blue',
        borderRadius: 17,
        marginVertical: 5
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    titleInner: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    }
});