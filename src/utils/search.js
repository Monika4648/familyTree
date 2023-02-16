
import { useSelectedNodeState, useTreeState } from "../contexts";


export const SearchFamily = ({ searchTerm }) => {

    const [treeState, setTreeDataState] = useTreeState();


    const contains = (text, searchTerm) => {
        return ((text.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) || searchTerm === undefined);
    }

    const searchLogic = (searchTerm) => {
        setTreeDataState((prev) => {
            const recur = (family) => {
                if (!family) return;
                let acc = {};
                if (contains(family.Name, searchTerm)) {
                    acc = { ...acc, family };
                } else if (family?.children && family.children.length > 0) {
                    let newItems = recur(family.children, searchTerm);
                    if (newItems && newItems.length > 0) {
                        acc = (acc, { Name: family.Name, children: newItems });
                    }
                }
                return acc;
            }
            const gg = recur(prev);

            return gg;



        });

    }
    return { searchLogic }

}