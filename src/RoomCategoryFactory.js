import SeasonPriceFactory from './SeasonPriceFactory'
import rooms from './data/rooms'

class AbstractRoomCategory {
  constructor(id, isSharing) {
    this.id = id
    this.isSharing = isSharing
  }

  bedCount() {
    return 2
  }

  getSingleInDoubleOccupancyRoomDiscount(seasonPrice) {
    return seasonPrice.getSingleInDoubleOccupancyRoomDiscount()
  }

  getRoomBaseRate(date, nights){
    const seasonPrice = SeasonPriceFactory.createSeasonPrice(date)
    const roomCategory = this.isSharing ? this.getRoomCategoryForShared() : this
    
    if (this.isSharing) {
      return seasonPrice.getRoomBaseRate(roomCategory.id, nights)
    } else {
      return seasonPrice.getRoomBaseRate(roomCategory.id, nights) * this.bedCount() * (100 - this.getSingleInDoubleOccupancyRoomDiscount(seasonPrice)) / 100
    }
  }
  
  // in some room categories such as GardenDoubleRoomCategory the price is taken from another room category,
  // namely: GardenSharedRoomCategory, when the room is shared.
  getRoomCategoryForShared() {
    return this 
  }
}

class AbstractSingleBedRoomCategory extends AbstractRoomCategory {
  getSingleInDoubleOccupancyRoomDiscount(seasonPrice) {
    return 0 // This is not a double occupancy room. Single occupancy discount never applies here.
  }

  bedCount() {
    return 1
  }
}

class BeachFrontRoomCategory extends AbstractRoomCategory {}
class OceanViewRoomCategory extends AbstractRoomCategory {}
class BeachHutRoomCategory extends AbstractRoomCategory {}
class GardenBathRoomCategory extends AbstractRoomCategory {}
class GardenDoubleRoomCategory extends AbstractSingleBedRoomCategory {
  getRoomCategoryForShared() {
    return RoomCategoryFactory.createRoomCategory('GARDEN_SHARED_SHARING')
  }
}
class GardenSharedRoomCategory extends AbstractRoomCategory {}
class GardenSingleRoomCategory extends AbstractSingleBedRoomCategory {}
class DormitoryRoomCategory extends AbstractSingleBedRoomCategory {}
class TentHutRoomCategory extends AbstractSingleBedRoomCategory {}
class TentSpaceRoomCategory extends AbstractSingleBedRoomCategory {}

export default class RoomCategoryFactory {
  static getRooms() {
    return rooms
  }

  static createRoomCategory(roomId, isSharing) {
    switch (roomId) {
      case 'BEACHFRONT': return new BeachFrontRoomCategory('BEACHFRONT', false || isSharing)
      case 'BEACHFRONT_SHARING': return new BeachFrontRoomCategory('BEACHFRONT', true || isSharing)
      case 'OCEAN_VIEW': return new OceanViewRoomCategory('OCEAN_VIEW', false || isSharing)
      case 'OCEAN_VIEW_SHARING': return new OceanViewRoomCategory('OCEAN_VIEW', true || isSharing)
      case 'BEACH_HUT': return new BeachHutRoomCategory('BEACH_HUT', false || isSharing)
      case 'BEACH_HUT_SHARING': return new BeachHutRoomCategory('BEACH_HUT', true || isSharing)
      case 'GARDEN_BATH': return new GardenBathRoomCategory('GARDEN_BATH', false || isSharing)
      case 'GARDEN_BATH_SHARING': return new GardenBathRoomCategory('GARDEN_BATH', true || isSharing)
      case 'GARDEN_DOUBLE': return new GardenDoubleRoomCategory('GARDEN_DOUBLE', false || isSharing)
      case 'GARDEN_DOUBLE_SHARING': return new GardenDoubleRoomCategory('GARDEN_DOUBLE', true || isSharing)
      case 'GARDEN_SHARED': return new GardenSharedRoomCategory('GARDEN_SHARED', false)
      case 'GARDEN_SHARED_SHARING': return new GardenSharedRoomCategory('GARDEN_SHARED', true || isSharing)
      case 'GARDEN_SINGLE': return new GardenSingleRoomCategory('GARDEN_SINGLE', false || isSharing)
      case 'DORMITORY': return new DormitoryRoomCategory('DORMITORY', false || isSharing)
      case 'TENT_HUT': return new TentHutRoomCategory('TENT_HUT', false || isSharing)
      case 'TENT_SPACE': return new TentSpaceRoomCategory('TENT_SPACE', false || isSharing)
      case 'NULL_ROOM': return new TentSpaceRoomCategory('NULL_ROOM', false || isSharing)
      default: throw new Error(`Invalid roomId: "${roomId}"`)
    }
  };
}
