
import { useState } from "react";
import { useSelectedNodeState, useTreeState } from "../contexts";

export function uid() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
};

export const initialFamilyInfoState = {
  "Name": "people1",
  "Spouse": "people2",
  "Location": "india",
  "Birth Year": "1234",
  "Present Address": "adfsaf",
  "Family Photo": null
}

export const useDeleteFamily = (afterAdding = () => { }) => {

  const [selectedNode] = useSelectedNodeState();
  const [treeState, setTreeDataState] = useTreeState();



  const deleteFamily = (e) => {
    const uId = selectedNode.id;
    e.preventDefault();
    selectedNode && setTreeDataState(prevTree => {

      const clone = { ...prevTree }
      let currentNode = clone;
      selectedNode.ancentors.forEach((node, i) => {
        if (i !== 0) {
          let parent = currentNode;
          currentNode = currentNode.children[node];
          if (currentNode.id == uId) {

            delete parent.children[uId];
          }
        }
      });


      return clone
    })
  }
  return { deleteFamily };

}


export const useAddFamily = ({ initialFamilyInfoState, afterAdding = () => { }, }) => {

  const [familyInfo, setFamilyInfo] = useState(initialFamilyInfoState)

  const [selectedNode] = useSelectedNodeState()
  const [treeState, setTreeDataState] = useTreeState()


  const addFamily = (e) => {
    e.preventDefault()
    selectedNode && setTreeDataState(prevTree => {
      const clone = { ...prevTree }
      const uId = uid()
      let currentNode = clone
      selectedNode.ancentors.forEach((node, i) => {
        if (i !== 0) {

          currentNode = currentNode.children[node]
        }
      })
      currentNode.children = currentNode.children ? { ...currentNode.children, [uId]: { id: uId, ...familyInfo } } : { [uId]: { id: uId, ...familyInfo } }
      return clone
    })

    !selectedNode && Object.keys(treeState).length === 0 && setTreeDataState(() => {
      return {
        id: uid(),
        ...familyInfo
      }
    })
    afterAdding();
    setFamilyInfo(initialFamilyInfoState)
  }

  const setFamilyInfoState = e => {
    const { name, value } = e.target
    setFamilyInfo(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const onPicUpload = e => {
    const picUrls = []

    const allSelectedImgs = e.target.files

    for (let index = 0; index < allSelectedImgs.length; index++) {
      const currentImg = allSelectedImgs[index];
      picUrls.push(URL.createObjectURL(currentImg))
    }

    picUrls.length > 0 && setFamilyInfo(prevState => {
      return {
        ...prevState,
        "Family Photo": picUrls
      }
    })
  }

  return { familyInfo, setFamilyInfoState, addFamily, onPicUpload }
}

