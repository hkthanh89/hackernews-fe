import { useRouter } from 'next/router';
import ListNews from './ListNews';
import DetailsNews from './DetailsNews';

export default function News() {
  const router = useRouter()
  const { url, page } = router.query

  if (url) {
    return <DetailsNews />
  }

  if (page) {
    return <ListNews page={parseInt(page, 10)} />
  }

  return <ListNews page={1} />
}