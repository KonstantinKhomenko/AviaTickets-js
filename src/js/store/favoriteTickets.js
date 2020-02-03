import favoriteUI from "../views/favorite";

class FavoriteTickets {
	constructor(favorite) {
		this.favoriteStore = {};
		this.favorite = favorite;
	}

	getFavorite() {
		this.favorite.getFavorite(this.favoriteStore);
	}

	deleteFavorite(item) {
		delete this.favoriteStore[item];
		this.favorite.clearContainer();
		this.getFavorite();
	}

	setFavorite(item) {
		const obj = {};
		obj[item.id] = item;
		Object.assign(this.favoriteStore, obj);
		this.getFavorite();
	}
}

const favoriteTickets = new FavoriteTickets(favoriteUI);

export default favoriteTickets;