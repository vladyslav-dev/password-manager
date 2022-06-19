import { TGroupCollection } from '../interfaces/group';
import { IOption } from "../components/dashboard/Select"

export const transformGroupsToOptions = (groupsCollection: TGroupCollection, currentId: string) => (
    Object.values(groupsCollection).reduce((acc: IOption[], group) => {
        if (group._id !== currentId) {
            acc.push({
                id: group._id,
                text: group.title
            })
        }
        return acc
    }, [])
)

export const transformGroupsToFilter = (groupTitles: string[], currentTitle: string) => (
    groupTitles.reduce((acc: IOption[], groupTitle: string) => {
        if (groupTitle !== currentTitle) {
            acc.push({
                id: groupTitle,
                text: groupTitle
            })
        }
        return acc
    }, [])
)