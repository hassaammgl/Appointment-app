export class DTO {
  static userDto(user) {
    return {
      _id: user._id.toString(),
      name: user.username,
      email: user.email,
    };
  }
}
