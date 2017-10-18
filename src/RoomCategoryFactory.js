import SeasonPriceFactory from './SeasonPriceFactory'
import rooms from './data/rooms'

class AbstractRoomCategory {
  constructor(id, isWillingToShare, reservation) {
    this.id = id
    this.reservation = reservation
    this.isSharing = isWillingToShare || reservation.adults + reservation.children > 1
  }

  bedCount() {
    return 2
  }

  getSingleInDoubleOccupancyRoomDiscount(seasonPrice) {
    return seasonPrice.getSingleInDoubleOccupancyRoomDiscount()
  }

  getRoomRate(date){
    const seasonPrice = SeasonPriceFactory.createSeasonPrice(date)
    const roomCategory = this.isSharing ? this.getRoomCategoryForShared() : this
    
    let baseRate;

    if (this.isSharing) {
      baseRate = seasonPrice.getRoomBaseRate(roomCategory.id, this.reservation.nights)
    } else {
      baseRate = seasonPrice.getRoomBaseRate(roomCategory.id, this.reservation.nights) * this.bedCount() * (100 - this.getSingleInDoubleOccupancyRoomDiscount(seasonPrice)) / 100
    }

    return baseRate * (this.reservation.adults + this.reservation.children / 2)
  }
  
  // in some room categories such as GardenDoubleRoomCategory the price is taken from another room category,
  // namely: GardenSharedRoomCategory, when the room is shared.
  getRoomCategoryForShared() {
    return this 
  }
}

class AbstractSingleBedRoomCategory extends AbstractRoomCategory {
  // This is not a double occupancy room. Single occupancy discount never applies here.
  getSingleInDoubleOccupancyRoomDiscount(seasonPrice) {
    return 0
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

  static createRoomCategory(roomId, reservation) {
    switch (roomId) {
      case 'BEACHFRONT': return new BeachFrontRoomCategory('BEACHFRONT', false, reservation)
      case 'BEACHFRONT_SHARING': return new BeachFrontRoomCategory('BEACHFRONT', true, reservation)
      case 'OCEAN_VIEW': return new OceanViewRoomCategory('OCEAN_VIEW', false, reservation)
      case 'OCEAN_VIEW_SHARING': return new OceanViewRoomCategory('OCEAN_VIEW', true, reservation)
      case 'BEACH_HUT': return new BeachHutRoomCategory('BEACH_HUT', false, reservation)
      case 'BEACH_HUT_SHARING': return new BeachHutRoomCategory('BEACH_HUT', true, reservation)
      case 'GARDEN_BATH': return new GardenBathRoomCategory('GARDEN_BATH', false, reservation)
      case 'GARDEN_BATH_SHARING': return new GardenBathRoomCategory('GARDEN_BATH', true, reservation)
      case 'GARDEN_DOUBLE': return new GardenDoubleRoomCategory('GARDEN_DOUBLE', false, reservation)
      case 'GARDEN_DOUBLE_SHARING': return new GardenDoubleRoomCategory('GARDEN_DOUBLE', true, reservation)
      case 'GARDEN_SHARED': return new GardenSharedRoomCategory('GARDEN_SHARED', false)
      case 'GARDEN_SHARED_SHARING': return new GardenSharedRoomCategory('GARDEN_SHARED', true, reservation)
      case 'GARDEN_SINGLE': return new GardenSingleRoomCategory('GARDEN_SINGLE', false, reservation)
      case 'DORMITORY': return new DormitoryRoomCategory('DORMITORY', false, reservation)
      case 'TENT_HUT': return new TentHutRoomCategory('TENT_HUT', false, reservation)
      case 'TENT_SPACE': return new TentSpaceRoomCategory('TENT_SPACE', false, reservation)
      case 'NULL_ROOM': return new TentSpaceRoomCategory('NULL_ROOM', false, reservation)
      default: throw new Error(`Invalid roomId: "${roomId}"`)
    }
  };
}
