import { useRouter } from "next/router";

export default function StudentsPage() {
  const router = useRouter();
  console.log(router);
  console.log(router.query.roomId);

  return <div>students</div>;
}
