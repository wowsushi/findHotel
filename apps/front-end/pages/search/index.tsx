import { HotelCard } from './HotelCard'
import { SearchArea } from './SearchArea'

const Search = () => {
  return (
    <div className="container max-w-screen-lg mx-auto py-4 px-2 flex flex-row">
      <SearchArea />
      <div>
        <HotelCard />
        <HotelCard />
        <HotelCard />
        <HotelCard />
        <HotelCard />
        <HotelCard />
        <HotelCard />
      </div>
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
