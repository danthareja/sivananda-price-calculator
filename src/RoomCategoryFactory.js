import SeasonPriceFactory from './SeasonPriceFactory'
import rooms from './data/rooms'

class AbstractRoomCategory {
  constructor(id, isWillingToShare, reservation) {
    this.id = id
    this.reservation = Object.assign({}, reservation)
    this.isSharing = isWillingToShare || reservation.adults + reservation.children > 1
  }

  bedCount() {
    return 2
  }

  getSingleInDoubleOccupancyRoomDiscount(seasonPrice) {
    return seasonPrice.getSingleInDoubleOccupancyRoomDiscount()
  }

  getBaseRateMultiplier() {
    return this.reservation.adults + ( this.reservation.children / 2 )
  }

  getBaseRate(date) {
    const seasonPrice = SeasonPriceFactory.createSeasonPrice(date)
    const roomCategory = this.isSharing ? this.getRoomCategoryForShared() : this
    
    if (this.isSharing) {
      return seasonPrice.getRoomBaseRate(roomCategory.id, this.reservation.nights)
    } else {
      return seasonPrice.getRoomBaseRate(roomCategory.id, this.reservation.nights) * this.bedCount() * (100 - this.getSingleInDoubleOccupancyRoomDiscount(seasonPrice)) / 100
    }
  }

  getRate(date){
    return this.getBaseRate(date) * this.getBaseRateMultiplier()
  }
  
  // In some room categories the price is taken from another room category when the room is shared
  getRoomCategoryForShared() {
    return this 
  }
}

class AbstractSingleBedRoomCategory extends AbstractRoomCategory {
  bedCount() {
    return 1
  }

  // This is not a double occupancy room, single occupancy discount never applies here.
  getSingleInDoubleOccupancyRoomDiscount(seasonPrice) {
    return 0
  }
}

class BeachFrontRoomCategory extends AbstractRoomCategory {
  // Beach front rooms have a two adult minimum
  // Until there are two adults, children count as adults
  getBaseRateMultiplier() {
    if (!this.isSharing) {
      return super.getBaseRateMultiplier()
    }

    let adults = this.reservation.adults
    let children = this.reservation.children

    if (adults === 1 && children > 0) {
      adults += 1
      children -= 1
    }

    return adults + ( children / 2 )
  }
}
class OceanViewRoomCategory extends AbstractRoomCategory {
  // Ocean view rooms have a two adult minimum
  // Until there are two adults, children count as adults
  getBaseRateMultiplier() {
    if (!this.isSharing) {
      return super.getBaseRateMultiplier()
    }

    let adults = this.reservation.adults
    let children = this.reservation.children

    if (adults === 1 && children > 0) {
      adults += 1
      children -= 1
    }

    return adults + ( children / 2 )
  }
}
class BeachHutRoomCategory extends AbstractRoomCategory {}
class GardenBathRoomCategory extends AbstractRoomCategory {}
class GardenDoubleRoomCategory extends AbstractSingleBedRoomCategory {
  getRoomCategoryForShared() {
    return RoomCategoryFactory.createRoomCategory('GARDEN_SHARED_SHARING', this.reservation)
  }
}
class GardenSharedRoomCategory extends AbstractRoomCategory {}
class GardenSingleRoomCategory extends AbstractSingleBedRoomCategory {}
class DormitoryRoomCategory extends AbstractSingleBedRoomCategory {}
class TentHutRoomCategory extends AbstractSingleBedRoomCategory {}
class TentSpaceRoomCategory extends AbstractSingleBedRoomCategory {}

export default class RoomCategoryFactory {
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
      case 'GARDEN_SHARED': return new GardenSharedRoomCategory('GARDEN_SHARED', false, reservation)
      case 'GARDEN_SHARED_SHARING': return new GardenSharedRoomCategory('GARDEN_SHARED', true, reservation)
      case 'GARDEN_SINGLE': return new GardenSingleRoomCategory('GARDEN_SINGLE', false, reservation)
      case 'DORMITORY': return new DormitoryRoomCategory('DORMITORY', false, reservation)
      case 'TENT_HUT': return new TentHutRoomCategory('TENT_HUT', false, reservation)
      case 'TENT_SPACE': return new TentSpaceRoomCategory('TENT_SPACE', false, reservation)
      case 'NULL_ROOM': return new TentSpaceRoomCategory('NULL_ROOM', false, reservation)
      default: throw new Error(`Invalid roomId: ${roomId}. Must be one of ${rooms.map(r => r.id).join(', ')}`)
    }
  };
}


