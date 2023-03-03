import { HotelCard } from './HotelCard'

const Search = () => {
  return (
    <div className="container max-w-screen-md mx-auto py-4 px-2">
      <HotelCard />
      <HotelCard />
      <HotelCard />
      <HotelCard />
      <HotelCard />
      <HotelCard />
      <HotelCard />
    </div>
  )
}
export async function getStaticProps(context) {
  return {
    props: {
      pageTitle: '現在就預訂飯店！',
    },
  }
}
export default Search
