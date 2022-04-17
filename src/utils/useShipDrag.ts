import { DragItem } from "../state/types";
import { useDrag } from "react-dnd";
import { useAppState } from "../state/appStateContext";
import { selectShip } from "../state/actions";

export const useShipDrag = (item: DragItem) => {
  const { dispatch } = useAppState();

  const [{ isDragging }, drag] = useDrag({
    type: item.type,
    // item: () => {
    //   dispatch(selectShip(item.playerId, item.shipName));
    // },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    // end: () => {},
  });

  return { drag, isDragging };
};
