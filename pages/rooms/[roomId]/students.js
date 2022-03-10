import { useRouter } from "next/router";
import RoomLayout from "../../../components/Layout/RoomLayout";

export default function StudentsPage() {
  const router = useRouter();
  console.log(router);
  console.log(router.query.roomId);

  return <RoomLayout>student</RoomLayout>;
}
